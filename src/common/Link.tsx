import { useRouter, Router } from 'next/router'

export default (props: { href: string, children: any }) => {
    const router = useRouter();

    const navigateTo = (e: any, href: string) => {
        router.push(href);
        e.preventDefault();
    }
    
    return <a href={props.href}
        onClick={(e) => navigateTo(e, props.href)}>
        {props.children}
    </a>
}