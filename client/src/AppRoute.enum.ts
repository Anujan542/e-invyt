export enum AppRoute {
  main = '/',
  signup = '/auth/signup',
  verifyOTP = '/verify-otp',
  login = '/auth/login',
  event = '/events/:id',
  studentClip = '/events/:id/:studentId',
  createEvent = '/create-event',
  eventDetails = '/event-details',
  NotFound = '*',
}
