// https://stackoverflow.com/questions/76122243/the-image-path-is-weird-and-i-cannot-see-any-image-after-deploying-my-next-js-ap
export default function ImageLoader({ src }) {
    return `https://zhangvicto.github.io/hodytek-deploy/${src}`;
}
