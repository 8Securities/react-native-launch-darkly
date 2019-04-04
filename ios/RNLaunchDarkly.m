
#import "RNLaunchDarkly.h"
#import <Darkly/DarklyConstants.h>

@implementation RNLaunchDarkly

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"FeatureFlagChanged"];
}

RCT_EXPORT_METHOD(configure:(NSString*)apiKey
                    options:(NSDictionary*)options
                    userOptions:(NSDictionary*)userOptions
                    resolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(RCTPromiseRejectBlock)reject) {
    NSLog(@"configure with %@", options);

    LDConfigBuilder *config = [[LDConfigBuilder alloc] init];
    [config withMobileKey:apiKey];

    NSString* baseUrl           = options[@"baseUrl"];
    NSString* eventsUrl         = options[@"eventsUrl"];
    NSNumber* streaming         = options[@"streaming"];

    if (baseUrl) {
        [config withBaseUrl:baseUrl];
    }

    if (eventsUrl) {
        [config withEventsUrl:eventsUrl];
    }

    if ([streaming isEqualToNumber:[NSNumber numberWithBool:YES]]) {
        [config withStreaming:TRUE];
    } else {
        [config withStreaming:FALSE];
    }

    LDUserBuilder *user = [RNLaunchDarkly userBuilderFromOptions:userOptions];

    if ( self.user ) {
        self.user = [user build];
        bool updatedSuccesfully = [[LDClient sharedInstance] updateUser:user];
        NSString* key = self.user.key;
        NSLog(@"LaunchDarkly User was updated. Key=%@ IsSuccess=%@", key, updatedSuccesfully ? @"YES" : @"NO");
        resolve(@{ @"key": key});
        return;
    }

    self.user = [user build];

    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(handleFeatureFlagChange:)
     name:kLDFlagConfigChangedNotification
     object:nil];

    [[LDClient sharedInstance] start:config userBuilder:user];
    NSString* key = self.user.key;
    resolve(@{ @"key": key});
}

RCT_EXPORT_METHOD(identify:(NSDictionary*)userOptions) {
    LDUserBuilder *user = [RNLaunchDarkly userBuilderFromOptions:userOptions];
    self.user = [user build];
    bool updatedSuccesfully = [[LDClient sharedInstance] updateUser:user];
    NSString* key = self.user.key;
    NSLog(@"LaunchDarkly User was updated. Key=%@ IsSuccess=%@", key, updatedSuccesfully ? @"YES" : @"NO");
}

RCT_EXPORT_METHOD(boolVariation:(NSString*)flagName
                    resolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(RCTPromiseRejectBlock)reject) {
    BOOL showFeature = [[LDClient sharedInstance] boolVariation:flagName fallback:NO];
    resolve(@[[NSNumber numberWithBool:showFeature]]);
}

RCT_EXPORT_METHOD(stringVariation:(NSString*)flagName
                    fallback:(NSString*)fallback
                    resolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(RCTPromiseRejectBlock)reject) {
    NSString* flagValue = [[LDClient sharedInstance] stringVariation:flagName fallback:fallback];
    resolve(@[flagValue]);
}

- (void)handleFeatureFlagChange:(NSNotification *)notification
{
    NSString *flagName = notification.userInfo[@"flagkey"];
    [self sendEventWithName:@"FeatureFlagChanged" body:@{@"flagName": flagName}];
}

+ (LDUserBuilder*)userBuilderFromOptions:(NSDictionary*)options
{
    NSString* key           = options[@"key"];
    NSString* firstName     = options[@"firstName"];
    NSString* lastName      = options[@"lastName"];
    NSString* email         = options[@"email"];
    NSNumber* isAnonymous   = options[@"isAnonymous"];
    NSString* organization   = options[@"organization"];

    NSArray* nonCustomFields  = @[@"key", @"firstName", @"lastName", @"email", @"isAnonymous"];

    LDUserBuilder *user = [[LDUserBuilder alloc] init];

    user = [user withKey:key];

    if (firstName) {
        user = [user withFirstName:firstName];
    }

    if (lastName) {
        user = [user withLastName:lastName];
    }

    if (email) {
        user = [user withEmail:email];
    }

    for (NSString* key in options) {
      if (![nonCustomFields containsObject:key]) {
        NSLog(@"LaunchDarkly Custom Field key=%@", key);
        user = [user withCustomString:key value:options[key]];
      }
    }

    if([isAnonymous isEqualToNumber:[NSNumber numberWithBool:YES]]) {
        user = [user withAnonymous:TRUE];
    }

    return user;
}

RCT_EXPORT_MODULE()

@end
