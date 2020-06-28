// const wait = ms =>
//     new Promise(resolve => {
//         setTimeout(() => resolve(), ms);
//     });

export default async location => {
    try {
        // await wait(3000);
        const result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
        );

        if (result.status === 200) {
            return { success: true, data: await result.json() };
        }

        return { success: false, error: result.statusText };
    } catch (ex) {
        return { success: false, error: ex.message };
    }
};
