import i18n from "i18next"
import { initReactI18next} from "react-i18next"
import en from './locales/en.json'
import ar from './locales/ar.json'


i18n.use(initReactI18next).init({
    resources:{
        en:{translation:en},
        ar:{translation:ar}
    },
    lang: 'en',
    fallbackLng:'en'
})

export default i18n;