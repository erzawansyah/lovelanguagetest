export const generateInitials = (name: string): string => {
    // 1. Pisahkan nama menjadi kata dan buang seluruh karakter selain huruf.
    const words = name.match(/[a-zA-Z]+/g) || [];

    // 2. Hitung jumlah kata.
    const wordCount = words.length;

    if (wordCount >= 3) {
        // 3. Jika jumlah kata berjumlah 3 atau lebih.
        const initials = words.map((word) => word[0].toUpperCase()).join('');
        return initials;
    } else if (wordCount === 1) {
        // 4. Jika jumlah kata hanya 1.
        const firstThree = words[0].substring(0, 3);
        return `${firstThree[0].toUpperCase()}${firstThree.substring(1)}`;
    } else if (wordCount === 2) {
        // 5. Jika jumlah kata hanya 2.
        const firstTwoWord1 = words[0].substring(0, 2);
        const firstLetterWord2 = words[1][0].toUpperCase();
        const initials = `${firstTwoWord1}${firstLetterWord2}`;
        if (initials.length === 3) {
            return initials;
        } else {
            const lastLetter = words[1][1] || '';
            return `${initials}${lastLetter}`;
        }
    } else {

        return name.replace(" ", '').substring(0, 3).toUpperCase();
    }
}