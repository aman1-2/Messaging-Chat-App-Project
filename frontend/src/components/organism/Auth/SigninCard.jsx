import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const SigninCard = () => {

    const navigate = useNavigate();

    const [signinform, setSigninForm] = useState({
        email: '',
        password: ''
    });

    return (
        <Card className="w-full h-full" > 

            <CardHeader>
                <CardTitle> Sign In </CardTitle>
                <CardDescription> Sign In to access your account</CardDescription>
            </CardHeader>
             
            <CardContent>

                <form className='space-y-3'>
                    <Input
                        placeholder = "Enter your email-id"
                        required
                        disabled={false}
                        type="email"
                        value = {signinform.email}
                        onchange = {(e) => setSigninForm({...signinform, email: e.target.value})} 
                    ></Input>

                    <Input
                        placeholder = "Enter your Password"
                        required
                        disabled = {false}
                        value = {signinform.password}
                        type = "password"
                        onchange = {(e) => setSigninForm({ ...signinform, password: e.target.value })}
                    ></Input>

                    <Button className="w-full" disabled={false} size='lg' type="submit">
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