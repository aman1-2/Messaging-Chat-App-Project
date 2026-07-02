import { Router } from "express";

import { signIn, signUp } from "../../controllers/userController.js";
import { validate } from "../../validators/zodValidator.js";
import { userSignUpSchema, userSignInSchema} from "../../validators/userSchema.js";

const router = Router();

router.post('/signup', validate(userSignUpSchema), signUp);
router.post('/signin', validate(userSignInSchema), signIn);

export default router;