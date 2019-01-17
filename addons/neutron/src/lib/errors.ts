export class BiometricInitializationFailed extends Error{ public message = "Unable to initialize the device" }
export class BiometricLoginFailed extends Error{ public message = "Unable to login to device" }
export class BiometricPreLoginFailed extends Error{ public message = "Unable to perform pre login to device" }
export class BiometricUserAddFailed extends Error{ public message = "Unable to add user to device" }
export class BiometricUserDeleteFailed extends Error{ public message = "Unable to Delete user on device" }
export class BiometricUserFreezeFailed extends Error{ public message = "Unable to Freeze user on device" }
export class BiometricUserUnfreezeFailed extends Error{ public message = "Unable to Unfreeze user on device" }
export class BiometricScanFPFailed extends Error{ public message = "Unable to scan fingerprint on device" }