export const formatName = (name) => {
    const parts = name.split(' ');

    if (parts.length > 1) {
        return `${parts[0]} ${parts[1][0]}.`;
    }
    return name;
};