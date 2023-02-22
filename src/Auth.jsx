import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

LocalStrategy.Strategy;

const users = [
  {
    id: 1,
    username: 'user1',
    password: '$2b$10$7OZTfNqhTix25F/8syDzXusyfMXOblzUs/AL.iCUcTkvVdeT6TIGS', // password is 'password'
  },
  {
    id: 2,
    username: 'user2',
    password: '$2b$10$4bjhL8zScwh3XG3n0SpmV.pYwUpd3CB3eBZtt0MgsDdwRy5o5m5X2', // password is 'password'
  },
];

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((user) => user.username === username);
    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return done(err);
      }
      if (!result) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});
