<template>
    <div class="mt-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="col-span-2 ">
            <div class="bg-white rounded rounded-lg">
                <div class="p-5 h-600 min-h-600 overflow-y-scroll ">
                    <CallChatTiles :lists="chats"/>
                </div>
                <div class="p-4">
                    <FormInput size="large" placeholder="Ask Someting"/>
                </div>
            </div>
            <div class="mt-5">
                <label class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Meeintg Summary</label>
                <div class="bg-white rounded-lg p-5 text-gray-600 text-sm leading-7">
                    Mohit: Our new product line focuses on streamlining workflow processes, increasing efficiency, and reducing operational costs. It integrates seamlessly with your existing systems and offers customizable features to meet your specific requirements.<br/>
                    Sandeep: That sounds promising. Can you provide more details about how it works?<br/>
                    Mohit: Certainly. Our platform offers modules for project management, task tracking, collaboration, and reporting. It allows teams to collaborate in real-time, assign tasks, track progress, and generate detailed reports. The interface is intuitive and user-friendly, ensuring a smooth transition for your team.<br/>
                    Sandeep: Do you have any case studies or success stories from similar companies?<br/>
                    Mohit: Yes, let me share a case study with you. We worked with Company X, a leading firm in your industry, to implement our platform. They were facing challenges with project delays and communication gaps between teams. After implementing our solution, Company X experienced a significant improvement in project delivery times and saw a 30% increase in overall productivity within the first six months.<br/>
                    Sandeep: Impressive. How does your pricing structure work?<br/>
                    Mohit: Our pricing is flexible and tailored to your usage and needs. We offer both subscription-based and pay-per-use models. The subscription model includes unlimited access to all features and ongoing support, while the pay-per-use model allows you to pay only for the features you use. We can discuss your specific requirements in more detail to determine the best pricing option for your company.<br/>
                    Sandeep: What level of support do you provide?<br/>
                    Mohit: We offer 24/7 customer support and dedicated account managers to ensure you receive the assistance you need. Our support team is highly trained and responsive, providing timely assistance with any issues or questions you may have. Additionally, we regularly update our platform with new features and enhancements based on customer feedback and industry trends.<br/>
                    Sandeep: That sounds reassuring. I'm also concerned about data security. How do you address that?<br/>
                    Mohit: Security is our top priority. Our platform is built with robust encryption protocols and undergoes regular security audits to ensure compliance with industry standards. We also provide advanced access controls, multi-factor authentication, and regular data backups to safeguard your information. You can trust that your data is secure with us.
                </div>

            </div>
        </div>
        <div>
            <div class="bg-white"><Accordion  :title="`Meeting FAQ's`" :icon="'fas fa-circle-question'" :accordions="faqsList" /></div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            faqsList: [
            { 
                title: 'What does your new product line focus on?', 
                description: 'Our new product line focuses on streamlining workflow processes, increasing efficiency, and reducing operational costs. It integrates seamlessly with your existing systems and offers customizable features to meet your specific requirements.' 
            },
            { 
                title: 'Can you provide more details about how your platform works?', 
                description: 'Certainly. Our platform offers modules for project management, task tracking, collaboration, and reporting. It allows teams to collaborate in real-time, assign tasks, track progress, and generate detailed reports. The interface is intuitive and user-friendly, ensuring a smooth transition for your team.' 
            },
            { 
                title: 'Do you have any case studies or success stories from similar companies?', 
                description: 'Yes, we have worked with Company X, a leading firm in your industry, to implement our platform. They faced challenges with project delays and communication gaps between teams. After implementing our solution, Company X experienced a significant improvement in project delivery times and saw a 30% increase in overall productivity within the first six months.' 
            },
            { 
                title: 'How does your pricing structure work?', 
                description: 'Our pricing is flexible and tailored to your usage and needs. We offer both subscription-based and pay-per-use models. The subscription model includes unlimited access to all features and ongoing support, while the pay-per-use model allows you to pay only for the features you use. We can discuss your specific requirements in more detail to determine the best pricing option for your company.' 
            },
            { 
                title: 'What level of support do you provide?', 
                description: 'We offer 24/7 customer support and dedicated account managers to ensure you receive the assistance you need. Our support team is highly trained and responsive, providing timely assistance with any issues or questions you may have. Additionally, we regularly update our platform with new features and enhancements based on customer feedback and industry trends.' 
            },
            { 
                title: 'How do you address data security concerns?', 
                description: 'Security is our top priority. Our platform is built with robust encryption protocols and undergoes regular security audits to ensure compliance with industry standards. We also provide advanced access controls, multi-factor authentication, and regular data backups to safeguard your information. You can trust that your data is secure with us.' 
            }
            ],
            chats :[
                { type: 'sender', message: "Hey, how's it going? I just wanted to catch up and see what's new with you. It feels like it's been ages since we last talked." },
                { type: 'receiver', message: "I'm doing well, thanks. Just been busy with work and life in general. How about you? What have you been up to lately?" },
                { type: 'sender', message: "Not too much, just trying to stay productive and keep myself occupied. I've been binge-watching a lot of shows in my free time." },
                { type: 'receiver', message: "Haha, that sounds like fun! Any recommendations? I'm always looking for new things to watch." },
                { type: 'sender', message: "Oh, definitely! I've been hooked on this new series that just came out. It's got everything - drama, suspense, romance..." },
                { type: 'receiver', message: "Nice, I'll have to check it out. Thanks for the suggestion!" },
                { type: 'sender', message: "No problem! Let me know what you think once you've watched a few episodes." },
                { type: 'receiver', message: "Will do! Anyway, how's your family? I remember you mentioning that your sister was visiting last time we talked." },
                { type: 'sender', message: "Yeah, she was here for a while, but she's gone back home now. It was great having her around, though." },
                { type: 'receiver', message: "That's nice. Family time is always important, especially with everything going on in the world." },
                { type: 'sender', message: "Absolutely. Speaking of which, how have you been holding up during these crazy times?" },
                { type: 'receiver', message: "It's been tough, but I'm managing. Trying to stay positive and take things one day at a time." },
                { type: 'sender', message: "That's all we can do, right? Hang in there, and remember that I'm here for you if you ever need to talk or vent." },
                { type: 'receiver', message: "Thanks, I really appreciate that. It means a lot to me." },
                { type: 'sender', message: "Of course! Friends look out for each other, no matter what." },
                { type: 'receiver', message: "You're the best, seriously. I don't know what I'd do without you." },
                { type: 'sender', message: "Aw, shucks. Right back at you!" },
                { type: 'receiver', message: "Haha, thanks. Anyway, I should probably get going. Talk to you later?" },
                { type: 'sender', message: "Sure thing! Take care and talk to you soon!" },
                { type: 'receiver', message: "You too, bye!" }
            ]

        }
    }
}
</script>