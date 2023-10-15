import React, { useEffect } from 'react'
import Container from '../components/container/Container';
import LoginSvg from '../components/svg/LoginSvg';
import { getAdaptedWidth } from '../helper/sizeAdapter';
import Input from '../components/input/Input';
import * as yup from 'yup';
import { Formik } from 'formik';
import ErrorLines from '../components/ErrorLines';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native';
import Row from '../components/row/Row';
import Label from '../components/label/Label';
import { themeGrey } from '../data/staticDatas';
import { useDispatch } from 'react-redux';
import { getCommonSlice } from '../store/_redux/common/service';
import { GetUser, UserLogin } from '../firebase/firebase';
import { getAuthSlice } from '../store/_redux/auth/service';
const initialValues = {
    "email": "",
    "password": ""
}
const validationSchema = yup.object().shape({
    "email": yup.string().required("Email is a required field!!!"),
    "password": yup.string().required("Password is a required field!!!").min(7, "Password must be more than 7 characters")
});
const inputsParams = {
    "email": {
        placeholder: "E-Mail"
    },
    "password": {
        placeholder: "Password"
    }
}
const inputs = Object.keys(initialValues);
const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const register = () => {
        navigation.navigate('/register')
    }
    const submit = (values) => {
        dispatch(getCommonSlice().setLoading(true))
        UserLogin(values)
            .then((res) => {
                if (res) {
                    GetUser(res.uid)
                        .then((response) => {
                            if (response) {
                                dispatch(getCommonSlice().setLoading(false))
                                dispatch(getAuthSlice().setUser({ ...res, custom: response }));
                                navigation.navigate('/main');
                            }
                        })
                }
                dispatch(getCommonSlice().setLoading(false))
            })
    }
    useEffect(() => {
        dispatch(getCommonSlice().setLoading(false))
    }, [])

    return (
        <Container ignorebottom ignoretop noscroll keyboard  >
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => submit(values)}
                validationSchema={validationSchema}>
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <>
                        <LoginSvg
                            style={{
                                width: getAdaptedWidth(230),
                                height: getAdaptedWidth(230),
                                marginTop: 48
                            }}
                        />
                        {
                            inputs.map((item, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <Input
                                            hide={item == 'password'}
                                            mt={i != 0 ? 16 : 0}
                                            placeholder={inputsParams[item].placeholder}
                                            value={values[item]}
                                            change={handleChange(item)}
                                        />
                                        <ErrorLines text={errors[item]} />
                                    </React.Fragment>

                                )
                            })
                        }
                        <Button
                            mt={16}
                            press={() => handleSubmit(values)}
                            text={"Login"} />
                        <Row
                            end
                            center
                            style={{
                                flex: 1,
                                alignItems: 'flex-end',
                                paddingBottom: 32
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => register()}>
                                <Label
                                    text={"If you don't have an account, Sign up!"}
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

export default Login