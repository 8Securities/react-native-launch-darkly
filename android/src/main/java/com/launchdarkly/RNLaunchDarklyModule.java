
package com.launchdarkly;

import android.app.Activity;
import android.app.Application;
import android.util.Log;
import android.net.Uri;
import android.support.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.common.collect.Sets;
import com.launchdarkly.android.FeatureFlagChangeListener;
import com.launchdarkly.android.LDClient;
import com.launchdarkly.android.LDConfig;
import com.launchdarkly.android.LDUser;
import com.launchdarkly.android.LaunchDarklyException;

import java.util.HashSet;
import java.util.Map;

public class RNLaunchDarklyModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private final Application application;
  private LDClient ldClient;
  private LDUser user;

  public RNLaunchDarklyModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    this.application = (Application) reactContext.getApplicationContext();
  }

  @Override
  public String getName() {
    return "RNLaunchDarkly";
  }

  @ReactMethod
  public void configure(@NonNull String apiKey, @NonNull ReadableMap options, @NonNull ReadableMap userOptions, @NonNull Promise promise) {
    this.user = userBuilderFromOptions(userOptions).build();

    if (this.ldClient != null) {
      this.ldClient.identify(user);
      WritableMap map = Arguments.createMap();
      if (userOptions.hasKey("email")) {
        map.putString("email", userOptions.getString("email"));
      }
      promise.resolve(map);
      return;
    }

    LDConfig ldConfig = buildConfig(apiKey, options);

    this.ldClient = LDClient.init(this.application, ldConfig, user, 1);
    WritableMap map = Arguments.createMap();
    if (userOptions.hasKey("email")) {
      map.putString("email", userOptions.getString("email"));
    }
    Log.d("RNLaunchDarklyModule", apiKey + " initialized with host " + ldConfig.getBaseUri().toString());
    promise.resolve(map);
  }

  @ReactMethod
  public void identify(ReadableMap options) {
    Log.d("RNLaunchDarklyModule", "identify");

    user = userBuilderFromOptions(options).build();
    ldClient.identify(user);
  }

  @ReactMethod
  public void allFlags(Promise promise) {
      Map<String, ?> map = ldClient.allFlags();

      // copy to WritableMap for react-native bridge
      WritableMap data = Arguments.createMap();
      for (Map.Entry<String, ?> entry : map.entrySet()) {
          String key = entry.getKey();

          String type = entry.getValue().getClass().getName();
                  Log.d("RNLaunchDarklyModule", "map " + key + ":" + type);
          switch(type) {
            case "java.lang.Boolean": 
               data.putBoolean(key, (Boolean) entry.getValue());
               break;
            case "java.lang.String": 
               data.putString(key, (String) entry.getValue());
               break;
          }
      }

      promise.resolve(data);
  }

  @ReactMethod
  public void addFeatureFlagChangeListener(String flagName) {
    FeatureFlagChangeListener listener = new FeatureFlagChangeListener() {
      @Override
      public void onFeatureFlagChange(String flagKey) {
        WritableMap result = Arguments.createMap();
        result.putString("flagName", flagKey);

        getReactApplicationContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("FeatureFlagChanged", result);
      }
    };

    try {
      LDClient.get().registerFeatureFlagListener(flagName, listener);
    } catch (LaunchDarklyException e) {
      Log.d("RNLaunchDarklyModule", e.getMessage());
      e.printStackTrace();
    }
  }

  @ReactMethod
  public void boolVariation(String flagName, Promise promise) {
    Log.d("RNLaunchDarklyModule", "boolVariation:" + flagName);

    Boolean variationResult = ldClient.boolVariation(flagName, false);
    promise.resolve(variationResult);
  }

  @ReactMethod
  public void stringVariation(String flagName, String fallback, Promise promise) {
    Log.d("RNLaunchDarklyModule", "stringVariation:" + flagName);

    String variationResult = ldClient.stringVariation(flagName, fallback);
    promise.resolve(variationResult);
  }

  private LDConfig buildConfig(String apiKey, ReadableMap options) {
    LDConfig.Builder configBuilder = new LDConfig.Builder()
    .setStream(false)
        .setMobileKey(apiKey);

    if (options.hasKey("baseUrl")) {
      configBuilder.setBaseUri(Uri.parse(options.getString("baseUrl")));
    }

    if (options.hasKey("eventsUrl")) {
      configBuilder.setEventsUri(Uri.parse(options.getString("eventsUrl")));
    }

    if (options.hasKey("streamUrl")) {
      configBuilder.setStreamUri(Uri.parse(options.getString("streamUrl")));
    }

    if (options.hasKey("streaming")) {
      configBuilder.setStream(options.getBoolean("streaming"));
    }

    LDConfig ldConfig = configBuilder.build();

    return ldConfig;
  }

  private LDUser.Builder userBuilderFromOptions(ReadableMap options) {
    String userKey = null;
    if (options.hasKey("key")) {
      userKey = options.getString("key");
    }

    LDUser.Builder userBuilder = new LDUser.Builder(userKey);

    if (options.hasKey("email")) {
      userBuilder = userBuilder.email(options.getString("email"));
    }

    if (options.hasKey("firstName")) {
      userBuilder = userBuilder.firstName(options.getString("firstName"));
    }

    if (options.hasKey("lastName")) {
      userBuilder = userBuilder.lastName(options.getString("lastName"));
    }

    if (options.hasKey("isAnonymous")) {
      userBuilder = userBuilder.anonymous(options.getBoolean("isAnonymous"));
    }

    HashSet<String> nonCustomFields = Sets.newHashSet("key", "email", "firstName", "lastName", "isAnonymous");

    ReadableMapKeySetIterator iterator = options.keySetIterator();
    while (iterator.hasNextKey()) {
      String key = iterator.nextKey();
      if (!nonCustomFields.contains(key)) {
        if (options.getType(key) == ReadableType.Number) {
          userBuilder = userBuilder.custom(key, options.getDouble(key));
        } else if (options.getType(key) == ReadableType.String) {
          userBuilder = userBuilder.custom(key, options.getString(key));
        }
        Log.d("RNLaunchDarklyModule", "Launch Darkly custom field: " + key);
      }
    }

    return userBuilder;
  }
}
