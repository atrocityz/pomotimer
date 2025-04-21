export const getRequestNotificationPermission = async () => {
  const permission = await Notification.requestPermission().catch(
    () => 'denied',
  )
  return permission === 'granted'
}
