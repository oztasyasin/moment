export function dateDistance(tarih1, tarih2) {
    const t1 = new Date(tarih1);
    const t2 = new Date(tarih2);

    const zamanFarki = Math.abs(t2 - t1);
    const gunFarki = zamanFarki / (1000 * 60 * 60 * 24);

    if (gunFarki >= 30) {
        const t1Yil = t1.getFullYear();
        const t2Yil = t2.getFullYear();
        const t1Ay = t1.getMonth();
        const t2Ay = t2.getMonth();

        let yilFarki = Math.abs(t2Yil - t1Yil);
        let ayFarki = Math.abs(t2Ay - t1Ay);
        if (yilFarki >= 1) {
            return `${yilFarki} years ago`
        }
        else if (ayFarki >= 1) {
            return `${ayFarki} months ago`
        }
    }
    if (gunFarki < 1) {
        const t1saat = t1.getHours();
        const t2saat = t2.getHours();
        const t1dakika = t1.getMinutes();
        const t2dakika = t2.getMinutes();
        const t1saniye = t1.getSeconds();
        const t2saniye = t2.getSeconds();

        const saatFarki = Math.abs(t1saat - t2saat);
        const dakikaFarki = Math.abs(t2dakika - t1dakika);
        const saniyeFarki = Math.abs(t2saniye - t1saniye);

        if (saatFarki >= 1) {
            return `${saatFarki} hours ago`
        }
        if (dakikaFarki >= 1) {
            return `${dakikaFarki} minutes ago`
        }
        return `${saniyeFarki} seconds ago`
    }
    return `${Math.ceil(gunFarki)} days ago`;
}