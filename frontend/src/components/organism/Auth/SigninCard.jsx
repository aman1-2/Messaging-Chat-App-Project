import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const SigninCard = ({
    signinForm, 
    changeHandler,
    onSigninFormSubmit,
    validationError,
    isSuccess,
    isPending,
    isError
}) => {

    const navigate = useNavigate();

    return (
        <Card className="w-full h-full" > 

            <CardHeader>
                <CardTitle> Sign In </CardTitle>
                <CardDescription> Sign In to access your account</CardDescription>

                {
                    validationError && (
                        <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                            <TriangleAlert className='size-5'></TriangleAlert>
                            <p> {validationError.message} </p>
                        </div>
                    )
                    
                }

                {
                    isError && (
                        <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                            <TriangleAlert className='size-5'></TriangleAlert>
                            <p> Password or Email is wrong </p>
                        </div>
                    )
                    
                }

                {
                    isSuccess && (
                        <div className='bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5'>
                            <FaCheck className='size-5'></FaCheck>
                            <p>
                                Successfully Signed in. You will be redirected to the Workspace in few seconds.

                                <LucideLoader2 className='animate-spin ml-2'></LucideLoader2>
                            </p>
                        </div>
                    )
                }

            </CardHeader>
             
            <CardContent>

                <form className='space-y-3' onSubmit={onSigninFormSubmit}>
                    <Input
                        name = "email"
                        placeholder = "Enter your email-id"
                        required
                        disabled={isPending}
                        type="email"
                        value = {signinForm.email}
                        onChange = {changeHandler} 
                    ></Input>

                    <Input
                        name = "password"
                        placeholder = "Enter your Password"
                        required
                        disabled = {isPending}
                        value = {signinForm.password}
                        type = "password"
                        onChange = {changeHandler}
                    ></Input>

                    <Button 
                        className="w-full" 
                        disabled={isPending} 
                        size='lg' 
                        type="submit"
                    >
                        Continue
                    </Button>

                </form>

                <Separator className="my-5"></Separator>

                <p className='text-s text-muted-foreground mt-4'>
                    Don't have an account ? {' '} 
                    <span 
                        className='text-sky-600 hover:underline cursor:pointer'
                        onClick={() => navigate('/auth/signup')}
                    > 
                        Create an account 
                    </span>
                </p>

            </CardContent>

        </Card>
    );
};

export default SigninCard;