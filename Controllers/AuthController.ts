const authService = require('../Services/AuthService');

async function postSignUp(req: Request, res:Response) {
  
  const {name,  email, password } = req.body;
  try {
    const user = await authService.signUp(name, email, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function postSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.signIn(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { postSignUp, postSignIn };
