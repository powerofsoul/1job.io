import { useRouter } from 'next/router'

export default (props: { href: string, children: any, className?: string }) => {
    const router = useRouter();

    const navigateTo = (e: any, href: string) => {
        router.push(href);
        e.preventDefault();
    }
    
    return <a href={props.href}
        className={props.className}
        onClick={(e) => navigateTo(e, props.href)}>
        {props.children}
    </a>
}