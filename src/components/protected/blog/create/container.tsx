'use client';

import React from 'react';
import type { Blog } from '@prisma/client';
import { useRouter } from 'next/navigation';

import BlogForm from './blog-form';

import { createBlog } from '@/src/actions/blog';
import { useCurrentUser } from '@/src/hooks/use-current-user';
import type { BlogFormSchemaType } from '@/src/schemas';

export const blogDeafultValue = `
Olá, aventureiros do Kakele,

Notícias emocionantes dos reinos de Kakele! Temos o prazer de anunciar uma próxima reformulação de nossos amados eventos de mapas, com o objetivo de reacender o espírito de aventura e comunidade. Lembra dos dias de glória do evento Glitch? Aqueles momentos em que os jogadores se reuniam para uma missão emocionante e recompensas valiosas? Estamos trazendo isso de volta, mas ainda melhor!

Por que a mudança? Percebemos que nossos aventureiros de nível mais alto têm ignorado esses eventos, já que os ganhos de experiência (XP) não correspondiam às suas façanhas de caça. Mas Kakele é mais do que apenas uma trituração implacável; trata-se de experiências diversas e envolventes. Queremos reacender a diversão e a camaradagem que os eventos de mapas costumavam oferecer.

Aqui estão as novidades:

Apresentando o status ‘Dungeon’: Assim como em nossas masmorras infinitas, os eventos agora terão um ‘limite de força’, injetando uma nova camada de desafio e emoção.
Recompensas de XP baseadas em nível: não importa o seu nível, participar de eventos agora renderá XP personalizado para você. Isso significa mais motivação para todos participarem da diversão!
Quais eventos estão evoluindo? Confira a tabela em nosso fórum do Discord para ver as mudanças e ter uma ideia da XP que você pode ganhar em diferentes níveis! Observe que você só pode concluir cada evento uma vez cada vez que ele for ativado.

Sua voz é importante para nós! Participe da conversa em nosso fórum do Discord, compartilhe suas ideias e ajude-nos a refinar essas mudanças. Lembre-se de que tudo isso é um trabalho em andamento, sujeito a ajustes com base no seu valioso feedback. Além disso, tenha uma experiência em primeira mão dessas mudanças em nosso servidor de testes que será lançado em março!

A aventura aguarda, heróis Kakele. Vamos tornar esses eventos lendários juntos!

Atenciosamente,
ViVa Games
`;

export default function CreateForm() {
  const router = useRouter();
  const user = useCurrentUser();

  const onHandleSubmit = async (data: BlogFormSchemaType) => {
    const blogData: Omit<Blog, 'id'> = {
      title: data.title,
      language: 'pt',
      description: data.description,
      imageUrl: data.imageUrl || null,
      authorId: user?.id || '',
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: null,
      published: data.published,
      content: data.content,
    };

    const result = JSON.parse(await createBlog(blogData));

    if (result?.message) {
      console.log(result);
      // toast({
      //   title: "Fail to create a post 😢",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{result.message}</code>
      //     </pre>
      //   ),
      // });
    } else {
      console.log(result);
      // toast({
      //   title: "Successfully create a post 🎉",
      //   description: data.title,
      // });
      router.push('/dashboard/blog');
    }
  };

  return (
    <BlogForm
      defaultBlog={{
        title: 'Create a new post',
        content: blogDeafultValue,
        imageUrl: '',
        published: false,
      }}
      onHandleSubmit={onHandleSubmit}
    />
  );
}
