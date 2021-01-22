import {Mixins} from '../../styles/'


const Images = {
    img_splash : require('./launch_screen.png'),
    img_btnBgGradient : require('./btnBgGradient.png'),
    img_loginBg : require('./loginBackground.png'),
    img_logo_circle : require('./logo_circle.png'),
    img_dummy_profile : require('./dummy_profile_img.png'),
    img_forgot_password : require('./img_forgotPassword.png'),
    img_backButton : require('./img_backButton.png'),

    //icons 

    back_icon_name : Mixins.IS_PLATFORM_IOS ? "ios-chevron-back" : "arrow-back" ,
    dropdown_icon_name : "ios-chevron-down-outline" ,
    
    user_name_icon : require('./icons/user_name_icon.png'),
    gender_icon : require('./icons/gender_icon.png'),
    phone_icon : require('./icons/phone_icon.png'),
    email_icon : require('./icons/email_icon.png'),
    password_icon : require('./icons/password_icon.png'),
    no_icon : require('./icons/no_icon.png'),
    tickmark_icon : require('./icons/tickmark_icon.png'),
}

export default Images