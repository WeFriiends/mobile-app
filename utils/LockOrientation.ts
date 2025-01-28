import * as ScreenOrientation from 'expo-screen-orientation'

type Orientation = ScreenOrientation.Orientation

const LockOrientation = async () => {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  )
  const orientation: Orientation = await ScreenOrientation.getOrientationAsync()
  return orientation
}

export default LockOrientation