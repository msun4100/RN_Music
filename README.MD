# RN_Music

## Physical device 실행

1. To see available devices ids'
2. Then you can specify your device id throught --deviceId

```cmd
$ adb devices
List of devices attached
2110a85334057ece        device

$ react-native run-android --deviceId=2110a85334057ece
```

## BUG FIX; java.lang.String cannot be cast to java.lang.Double

- [x] data.json id 값 String &rarr; Integer 로 수정
