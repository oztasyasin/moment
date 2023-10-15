import React, { Fragment } from 'react'
import Container from '../components/container/Container';
import RegisterSvg from '../components/svg/RegisterSvg';
import { getAdaptedWidth } from '../helper/sizeAdapter';
import Input from '../components/input/Input';
import * as yup from 'yup';
import { Formik } from 'formik';
import ErrorLines from '../components/ErrorLines';
import Button from '../components/Button';
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Row from '../components/row/Row';
import Label from '../components/label/Label';
import { themeGrey } from '../data/staticDatas';
import { Add, UserRegister } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { getCommonSlice } from '../store/_redux/common/service';
const initialValues = {
    "email": "",
    "userName": "",
    "password": "",
    "confirmPassword": "",
}
const validationSchema = yup.object().shape({
    "email": yup.string().required("Email is a required field!!!"),
    "userName": yup.string().required("Username is a required field!!!"),
    "password": yup.string().required("Password is a required field!!!").min(7, "Password must be more than 7 characters"),
    "confirmPassword": yup.string().required("Confirm Password is a required field!!!")
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
const inputsParams = {
    "email": {
        placeholder: "E-Mail"
    },
    "password": {
        placeholder: "Password"
    },
    "confirmPassword": {
        placeholder: "Confirm Password"
    },
    "userName": {
        placeholder: "Username"
    }
}
const inputs = Object.keys(initialValues);
const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const login = () => {
        navigation.navigate('/login')
    }
    const submit = (values) => {
        dispatch(getCommonSlice().setLoading(true));
        UserRegister(values)
            .then((res) => {
                if (res) {
                    const data = {
                        userName: values.userName,
                        userId: res,
                        profilePhoto: "",
                        email: values.email,
                    }
                    Add("user", data)
                        .then((res) => {
                            if (res) {
                                navigation.navigate('/login');
                            }
                        })
                }
                dispatch(getCommonSlice().setLoading(false));
            })
    }
    return (
        <Container ignorebottom ignoretop keyboard noscroll>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => submit(values)}
                validationSchema={validationSchema}>
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <RegisterSvg
                            style={{
                                width: getAdaptedWidth(150),
                                height: getAdaptedWidth(150),
                                marginTop: 72
                            }}
                        />
                        {
                            inputs.map((item, i) => {
                                return (
                                    <Fragment key={i}>
                                        <Input
                                            hide={item == 'password' || item == 'confirmPassword'}
                                            mt={i != 10 ? 16 : 0}
                                            placeholder={inputsParams[item].placeholder}
                                            value={values[item]}
                                            change={handleChange(item)}
                                            key={i + item} />
                                        <ErrorLines key={item + i} text={errors[item]} />
                                    </Fragment>

                                )
                            })
                        }
                        <Button
                            mt={16}
                            press={() => handleSubmit(values)}
                            text={"Register"} />
                        <Row
                            end
                            center
                            style={{
                                flex: 1,
                                alignItems: 'flex-end',
                                paddingBottom: 32
                            }}
                        >
                            <TouchableOpacity onPress={() => login()}>
                                <Label
                                    text={"Do you hav account? Login!"}
                                    font={[600, 14, 16]}
                                    color={themeGrey} />
                            </TouchableOpacity>
                        </Row>
                    </>
                )}

            </Formik>

        </Container>
    )
}

export default Register