import { Button } from "@/components/Button";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import {useSSO} from "@clerk/clerk-expo"
import * as Liking from "expo-linking"
import * as WebBrowser from "expo-web-browser"


WebBrowser.maybeCompleteAuthSession()

export default function SingIn(){

    const [isLoading, setIsLoading] = useState(false)
    const googleAuth =  useSSO()

    async function signInWithGoogle() {
        try {

            setIsLoading(true)
            const redirectUrl = Liking.createURL("/")
            
            
            if (oAuthFlow.authSessionResult?.type === 'success'){
                if(oAuthFlow.setActive){
                    await oAuthFlow.setActive({session: oAuthFlow.createdSessionId})
                }
            } else {
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        WebBrowser.warmUpAsync()
        return () => {
            WebBrowser.coolDownAsync()
        }
    },[])

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Entrar</Text>
            <Button
                icon="logo-google"
                title="Entrar com o Google"
                onPress={signInWithGoogle}
                isLoading={isLoading}
            />           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: 'center',
        gap: 12
    },

    text: {
        fontSize: 12,
        fontWeight: 'bold'
    }
})