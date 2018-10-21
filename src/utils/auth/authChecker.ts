export const authChecker = (/* { root, args, context, info }, roles */) => {
    // here you can read user from context
    // and check his permission in db against `roles` argument
    // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]

  return true; // or false if access denied
};
