export const getRequestNotificationPermission = async (setPermission) => {
  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      setPermission(true)
      return true
    }
    return false
  } catch (error) {
    new Error(error)
    return false
  }
}
