#!/bin/sh
#
# ---------------------------------------------------------------------
# Android Studio startup script.
# ---------------------------------------------------------------------
#

$ANDROID_HOME/tools/emulator @Pixel_API_24 &
sleep 5
react-native run-android
