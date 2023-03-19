import strings from "./localization";

export const parseSIPPCode = sippCode => {
    const carClass = strings.sipp.category[sippCode.charAt(0)];
    const doors = strings.sipp.type[sippCode.charAt(1)];
    const transmission = strings.sipp.transmission[sippCode.charAt(2)];
    const fuel = strings.sipp.fuel[sippCode.charAt(3)];

    return { carClass, doors, transmission, fuel };
};
