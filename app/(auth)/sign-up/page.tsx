'use client';

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import {useForm} from "react-hook-form";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
        fullName: '',
        email: '',
        password: '',
        country: 'PH',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology',
      },
      mode: 'onBlur' 
    }, );

    const onSubmit = async(data: SignUpFormData) => {
        try {
          console.log(data);
        } catch (e) {
          console.error(e);
        }
    }


    return (
        <>
            <h1 className="form-title">Sign up & Personalize</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField 
                        name="fullName"
                        label="Full Name"
                        placeholder="Pedro Delacruz"
                        error={errors.fullName}
                        validation={{ required: 'Full name is required', minLength: 2 }} register={undefined}            
                />

                <InputField 
                        name="fullName"
                        label="Full Name"
                        placeholder="Pedro Delacruz"
                        error={errors.fullName}
                        validation={{ required: 'Full name is required', minLength: 2 }} register={undefined}            
                />

                <InputField 
                        name="fullName"
                        label="Full Name"
                        placeholder="Pedro Delacruz"
                        error={errors.fullName}
                        validation={{ required: 'Full name is required', minLength: 2 }} register={undefined}            
                />               
                
                 
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
                </Button>
            </form>
        </>
    )
}

export default SignUp;