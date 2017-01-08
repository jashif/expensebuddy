

cd C:\Program Files\Java\jdk1.8.0_102\bin

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "E:\expense2\my-release-key.keystore"  "E:/expense2/platforms/android/build/outputs/apk/android-release-unsigned.apk" alias_name

pause
cd C:\Program Files (x86)\Android\android-sdk\build-tools\24.0.1

zipalign -v 4 "E:/expense2/platforms/android/build/outputs/apk/android-release-unsigned.apk" "E:/expense2/platforms/android/build/outputs/apk/android-release-signed.apk"

pause
