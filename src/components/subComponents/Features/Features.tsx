import SectionWrapper from "../../HeroPage/SectionWrapper"

 

const Features = () => {

    const features = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>,
            title: "Lifetime access",
            desc: "One-time payment and get access to everything without need to pay again, so you can save your money."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                </svg>,
            title: "Full access to all videos",
            desc: "Get full access to all of our course videos content, plus any new videos we add in the future."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>,
            title: "Recruiting Profile & Certificate",
            desc: "When you get the certificate, we refer you to tech companies so you can directly start their interview process."
        },
        {
            icon:
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M14.8204 4.26001C14.6218 4.6157 14.4448 4.98303 14.2904 5.36001C12.7732 5.12006 11.2276 5.12006 9.71041 5.36001C9.556 4.98303 9.37901 4.6157 9.18041 4.26001C7.75119 4.50421 6.36181 4.94155 5.05041 5.56001C2.70535 8.9443 1.64184 13.053 2.05041 17.15C3.57864 18.2989 5.29386 19.1751 7.12041 19.74C7.53632 19.1906 7.90751 18.6087 8.2304 18C7.63448 17.7803 7.0617 17.5023 6.52041 17.17C6.66887 17.0712 6.8093 16.9609 6.94041 16.84C8.51887 17.6003 10.2484 17.9952 12.0004 17.9952C13.7524 17.9952 15.4819 17.6003 17.0604 16.84C17.2004 16.96 17.3404 17.07 17.4804 17.17C16.9362 17.4997 16.364 17.7807 15.7704 18.01C16.0799 18.6325 16.4412 19.228 16.8504 19.79C18.6747 19.227 20.3869 18.3506 21.9104 17.2C22.3288 13.1022 21.2644 8.99019 18.9104 5.61001C17.6137 4.97875 16.2381 4.52468 14.8204 4.26001ZM8.68041 14.81C8.17999 14.7741 7.71295 14.5457 7.37733 14.1728C7.0417 13.7999 6.8636 13.3114 6.88041 12.81C6.86107 12.3079 7.03829 11.8181 7.37442 11.4446C7.71054 11.0711 8.17907 10.8435 8.68041 10.81C9.18175 10.8435 9.65027 11.0711 9.98639 11.4446C10.3225 11.8181 10.4997 12.3079 10.4804 12.81C10.4997 13.3121 10.3225 13.8019 9.98639 14.1754C9.65027 14.5489 9.18175 14.7765 8.68041 14.81ZM15.3204 14.81C14.82 14.7741 14.3529 14.5457 14.0173 14.1728C13.6817 13.7999 13.5036 13.3114 13.5204 12.81C13.5011 12.3079 13.6783 11.8181 14.0144 11.4446C14.3505 11.0711 14.8191 10.8435 15.3204 10.81C15.8227 10.841 16.2927 11.0679 16.6294 11.442C16.966 11.816 17.1423 12.3073 17.1204 12.81C17.1423 13.3128 16.966 13.804 16.6294 14.1781C16.2927 14.5521 15.8227 14.779 15.3204 14.81Z" fill="currentColor" />
                </svg>,
            title: "Private Discord",
            desc: "Ask for help, or questions and get answers from the team members as soon as possible."
        },
        {
            icon:
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M9.00033 22H10.0003V20H9.01133C8.70333 19.994 6.00033 19.827 6.00033 16C6.00033 14.007 5.33533 12.754 4.49833 12C5.33533 11.246 6.00033 9.993 6.00033 8C6.00033 4.173 8.70333 4.006 9.00033 4H10.0003V2H8.99833C7.26933 2.004 4.00033 3.264 4.00033 8C4.00033 10.8 2.32233 10.99 1.98633 11L2.00033 13C2.08233 13 4.00033 13.034 4.00033 16C4.00033 20.736 7.26933 21.996 9.00033 22ZM22.0003 11C21.9183 11 20.0003 10.966 20.0003 8C20.0003 3.264 16.7313 2.004 15.0003 2H14.0003V4H14.9893C15.2973 4.006 18.0003 4.173 18.0003 8C18.0003 9.993 18.6653 11.246 19.5023 12C18.6653 12.754 18.0003 14.007 18.0003 16C18.0003 19.827 15.2973 19.994 15.0003 20H14.0003V22H15.0023C16.7313 21.996 20.0003 20.736 20.0003 16C20.0003 13.2 21.6783 13.01 22.0143 13L22.0003 11Z" fill="currentColor" />
                </svg>,
            title: "Source code",
            desc: "Get acces to a Github repo includes the source code,  for every video."
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>,
            title: "Meetings with experts",
            desc: "Talk with big tech companies engineers and ask about anything you want, and get some guidance."
        },
    ]

    return (
        <SectionWrapper id="features" className="dark:my-0 bg-gray-50 dark:bg-gray-900 sm:my-16">
            <div className="custom-screen text-gray-600 dark:text-gray-300">
                <div className="max-w-xl space-y-3">
                    <h2 className="text-gray-800 dark:text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Join IO Academy and get access to all features
                    </h2>
                    <p>
                        We provide lectures, lab sessions, and instructor support to prepare students for industry-recognized Computer Science degrees.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="flex gap-x-4">
                                    <div className="flex-none w-12 h-12 bg-white dark:bg-gray-800 border dark:border-gray-700 text-blue-600 dark:text-sky-500 rounded-lg flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3">
                                            {item.desc}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default Features