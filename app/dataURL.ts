export default function publicDataURL(filename:string) {
    const deployment = false;
    if (deployment) {
        return "https://zhangvicto.github.io/hodytek-deploy/" + filename
    } else return "/" + filename;
}

export function publicPDFURL(filename:string) {
    const deployment = false;
    if (deployment) {
        return "https://zhangvicto.github.io/hodytek-deploy/" + filename
    } else return filename;
}
