'use client';

import CountrySelectField from "@/components/forms/CountrySelectField";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import {ErrorOption, FieldArray, FieldArrayPath, FieldError, FieldErrors, FieldName, FieldValues, FormState, InternalFieldName, ReadFormState, RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm, UseFormRegisterReturn} from "react-hook-form";

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
                    name="email"
                    label="Email"
                    placeholder="pedrodelacruz@gmail.com"
                    error={errors.email}
                    validation={{ required: 'email is required', pattern: /^\w+@\w+\.\w+$/, message: "email address is required" }} register={undefined}            
                />
 
                <CountrySelectField
                    name="selectCountry"
                    label="Country"
                    error={errors.country}
                    required control={{
                        _subjects: {
                            array: undefined,
                            state: undefined
                        },
                        _removeUnmounted: function (): void {
                            throw new Error("Function not implemented.");
                        },
                        _names: {
                            mount: undefined,
                            unMount: undefined,
                            disabled: undefined,
                            array: undefined,
                            watch: undefined,
                            focus: "",
                            watchAll: false
                        },
                        _state: {
                            mount: false,
                            action: false,
                            watch: false
                        },
                        _reset: function (values?: any, keepStateOptions?: Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; keepFieldsRef: boolean; }>): void {
                            throw new Error("Function not implemented.");
                        },
                        _options: undefined,
                        _getDirty: function <TName extends InternalFieldName, TData>(name?: TName, data?: TData): boolean {
                            throw new Error("Function not implemented.");
                        },
                        _resetDefaultValues: function (): void {
                            throw new Error("Function not implemented.");
                        },
                        _formState: {
                            isDirty: false,
                            isLoading: false,
                            isSubmitted: false,
                            isSubmitSuccessful: false,
                            isSubmitting: false,
                            isValidating: false,
                            isValid: false,
                            disabled: false,
                            submitCount: 0,
                            defaultValues: undefined,
                            dirtyFields: undefined,
                            touchedFields: undefined,
                            validatingFields: undefined,
                            errors: undefined,
                            isReady: false
                        },
                        _setValid: function (shouldUpdateValid?: boolean): void {
                            throw new Error("Function not implemented.");
                        },
                        _fields: undefined,
                        _formValues: undefined,
                        _proxyFormState: undefined,
                        _defaultValues: undefined,
                        _getWatch: function (fieldNames?: InternalFieldName | InternalFieldName[], defaultValue?: any, isMounted?: boolean, isGlobal?: boolean) {
                            throw new Error("Function not implemented.");
                        },
                        _setFieldArray: function <T extends Function, TFieldValues extends FieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>>(name: InternalFieldName, updatedFieldArrayValues?: Partial<FieldArray<TFieldValues, TFieldArrayName>>[], method?: T, args?: Partial<{ argA: unknown; argB: unknown; }>, shouldSetValue?: boolean, shouldUpdateFieldsAndErrors?: boolean): void {
                            throw new Error("Function not implemented.");
                        },
                        _getFieldArray: function <TFieldArrayValues>(name: InternalFieldName): Partial<TFieldArrayValues>[] {
                            throw new Error("Function not implemented.");
                        },
                        _setErrors: function (errors: FieldErrors<any>): void {
                            throw new Error("Function not implemented.");
                        },
                        _setDisabledField: function (props: { disabled?: boolean; name: FieldName<any>; }): void {
                            throw new Error("Function not implemented.");
                        },
                        _runSchema: function (names: InternalFieldName[]): Promise<{ errors: FieldErrors; }> {
                            throw new Error("Function not implemented.");
                        },
                        _focusError: function (): boolean | undefined {
                            throw new Error("Function not implemented.");
                        },
                        _disableForm: function (disabled?: boolean): void {
                            throw new Error("Function not implemented.");
                        },
                        _subscribe: function <TFieldNames extends readonly string[]>(payload: { name?: readonly [...TFieldNames] | TFieldNames[number]; formState?: Partial<ReadFormState>; callback: (data: Partial<FormState<any>> & { values: any; name?: InternalFieldName; }) => void; exact?: boolean; reRenderRoot?: boolean; }): () => void {
                            throw new Error("Function not implemented.");
                        },
                        register: function <TFieldName extends string = string>(name: TFieldName, options?: RegisterOptions<any, TFieldName>): UseFormRegisterReturn<TFieldName> {
                            throw new Error("Function not implemented.");
                        },
                        handleSubmit: function (onValid: SubmitHandler<any>, onInvalid?: SubmitErrorHandler<any>): (e?: React.BaseSyntheticEvent) => Promise<void> {
                            throw new Error("Function not implemented.");
                        },
                        unregister: function (name?: string | readonly string[] | string[], options?: Omit<Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; keepFieldsRef: boolean; }>, "keepErrors" | "keepValues" | "keepDefaultValues" | "keepIsSubmitted" | "keepSubmitCount"> & { keepValue?: boolean; keepDefaultValue?: boolean; keepError?: boolean; }): void {
                            throw new Error("Function not implemented.");
                        },
                        getFieldState: function <TFieldName extends string>(name: TFieldName, formState?: FormState<any>): { invalid: boolean; isDirty: boolean; isTouched: boolean; isValidating: boolean; error?: FieldError; } {
                            throw new Error("Function not implemented.");
                        },
                        setError: function (name: string, error: ErrorOption, options?: { shouldFocus: boolean; }): void {
                            throw new Error("Function not implemented.");
                        }
                    }}                />      
                
                <InputField 
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}        
                />               
                
                <SelectField 
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />
                  
                <SelectField 
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField 
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
                </Button>
            </form>
        </>
    )
}

export default SignUp;