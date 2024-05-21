<template>
    <div>
      <Button :text="'Sign Up with Facebook'" @click="loginWithFacebook" class="w-full sm:text-xs xl:text-sm flex justify-center" frontIcon="fa-brands fa-facebook" />
    </div>
  </template>
  
  <script setup lang="ts">
    const facebookId = import.meta.env.VITE_FACEBOOK_ID;
    const emits = defineEmits(['facebookData']);
    var  appId  = facebookId;
    async function loginWithFacebook() {
        try {
        await loadFacebookSDK();
    
        //@ts-ignore
        FB.init({
            appId,
            cookie: true,
            xfbml: true,
            version: 'v13.0',
        });
        //@ts-ignore
        FB.login((response) => {
            if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            if (response.status === 'connected') {
                //@ts-ignore
                FB.api('/me', 'GET', { fields: 'id,name,email' }, function(profileResponse) {
                    console.log('User Profile Data:', profileResponse);
                    const data = {
                        login_type: "social-login",
                        social_login_type: "facebook",
                        social_id: profileResponse?.id,
                        email:profileResponse?.email,
                        name:profileResponse?.name
                    }
                    // console.log("data--",data)
                    emits('facebookData',data)
                });
            } else {
                console.log('User is not logged in or hasn\'t granted permissions.');
            }
            } else {
            console.log('Facebook login cancelled or not authorized.');
            }
        }, { scope: 'public_profile,email' });
        } catch (error) {
        console.error('Error loading Facebook SDK:', error);
        }
    }
    
    async function loadFacebookSDK() {
        return new Promise((resolve, reject) => {
        //@ts-ignore
        if (window.FB) {
            //@ts-ignore
            resolve();
        } else {
            //@ts-ignore
            window.fbAsyncInit = () => {
            //@ts-ignore
            FB.init({
                appId,
                cookie: true,
                xfbml: true,
                version: 'v13.0',
            });
            //@ts-ignore
            resolve();
            };
    
            const script = document.createElement('script');
            script.src = 'https://connect.facebook.net/en_US/sdk.js';
            script.onerror = reject;
            document.head.appendChild(script);
        }
        });
    }
  </script>
  