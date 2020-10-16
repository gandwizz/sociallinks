import React, { useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { useRouter } from "next/router";
import Head from 'next/head';


const RedirectTo = () => {
    const router =useRouter();
    useEffect(() => {
        console.log("Carregou")
        setTimeout(() => {
            console.log("redireicona")
          router.push('/')
        }, 2000)
    }, []);

    return(
    <div className="w-1/2 mx-auto text-center mt-8">
        <head>
            <title>Página Não Encontrada</title>
        </head>
        <h1 className="font-bold text-4xl">URL Não Encontrada.</h1>
        <p>Estamos redirecionando você para a central de links. </p>
    </div>);
};

export async function getServerSideProps({params, res}){
    const client = Prismic.client('https://centrallinks.cdn.prismic.io/api/v2')
    const link = await client.getByUID('shortlink', params.slug);
    if(link){
       res.statusCode = 301 // conteudo movido permanentemente 
       res.setHeader('Location', link.data.destino.url) // redireciona 
       res.end()
       return;
    }
    return{
        props: {},
    }
}


export default RedirectTo;