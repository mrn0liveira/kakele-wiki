'use client';

import { Card, CardContent } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';

export default function Component() {
  return (
    <div className='flex min-h-[100dvh] flex-col'>
      <main className='flex-1'>
        <section className='relative flex w-full flex-col items-center justify-center py-12 md:py-24 lg:py-32'>
          <div className='container grid max-w-full items-center gap-6 overflow-hidden px-4 md:px-6 lg:grid-cols-2 lg:gap-12'>
            <div className='z-10 space-y-4'>
              <h1 className=' text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none'>
                Lucre Jogando: <br /> Abra Sua Loja Online
              </h1>
              <p className=' max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl'>
                Transforme sua experiência no MMORPG em lucro real! Abra sua loja online e venda seus itens raros
                diretamente para outros jogadores. Ganhe dinheiro jogando e alcance o próximo níve de sucesso!
              </p>
            </div>
            <video
              className='absolute top-0 mx-auto aspect-square overflow-hidden rounded-bl-[50%] rounded-br-[20%] rounded-tl-[20%] rounded-tr-[50%] object-cover object-center opacity-60 sm:w-full md:static md:opacity-100'
              src='/img/pricing/cc.mp4'
              width={400}
              height={400}
              muted
              autoPlay
              loop
            />
          </div>
        </section>
        <section id='cards' className='z-10 mt-40 w-full gap-8 bg-secondary/30 pb-12 md:py-24 lg:pb-32'>
          <div className='container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10'>
            <div className='space-y-3 text-center'>
              <h2 className='text-start text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-center'>
                O que oferecemos na My Store Games
              </h2>
              <p className='mx-auto max-w-[700px] text-start text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-center lg:text-base/relaxed xl:text-xl/relaxed'>
                Explore todas as funcionalidades e benefícios que nossa plataforma proporciona para tornar sua
                experiência de venda de itens de jogos online simples e eficiente.
              </p>
            </div>
            <div className='mt-12 grid w-full grid-cols-2 items-start justify-center gap-12 lg:grid-cols-4 lg:gap-12'>
              <div className='relative flex flex-col items-center justify-center gap-2'>
                <Image
                  className='rounded-lg transition-all hover:scale-110'
                  src='/img/pricing/11.png'
                  width={128}
                  height={128}
                  alt='My Store Games'
                />
                <h3 className='text-lg font-bold'>Escolha seu jogo favorito</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>Tibia, Kakele Onlime, Rucoy, entre outros</p>
                <svg
                  className='absolute -top-16 left-64 w-28 '
                  viewBox='0 0 400 400'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>SVGRepo icon</title>
                  <g id='SVGRepo_bgCarrier' stroke-width='0' />
                  <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' />
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      d='M35 262C160.529 140.938 328.006 207.285 361 215.518'
                      stroke='#ffffff'
                      stroke-opacity='0.9'
                      stroke-width='16'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M343.69 143C355.23 190.289 361 214.681 361 216.177C361 218.421 327.488 234.13 312 258'
                      stroke='#ffffff'
                      stroke-opacity='0.9'
                      stroke-width='16'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </g>
                </svg>
              </div>
              <div className='relative flex flex-col items-center justify-center gap-2'>
                <Image
                  className='rounded-lg transition-all hover:scale-110'
                  src='/img/pricing/13.png'
                  width={128}
                  height={128}
                  alt='My Store Games'
                />
                <h3 className='text-lg font-bold'>Participe de missões</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  errote mosntros e conquiste itens raros e valiosos.
                </p>
                <svg
                  className='absolute bottom-12 left-64 w-28 -scale-y-100 transform'
                  viewBox='0 0 400 400'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>SVGRepo icon</title>
                  <g id='SVGRepo_bgCarrier' stroke-width='0' />
                  <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' />
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      d='M35 262C160.529 140.938 328.006 207.285 361 215.518'
                      stroke='#ffffff'
                      stroke-opacity='0.9'
                      stroke-width='16'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M343.69 143C355.23 190.289 361 214.681 361 216.177C361 218.421 327.488 234.13 312 258'
                      stroke='#ffffff'
                      stroke-opacity='0.9'
                      stroke-width='16'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </g>
                </svg>
              </div>
              <div className='relative flex flex-col items-center justify-center gap-2'>
                <video
                  className='rounded-lg transition-all hover:scale-110'
                  src='/img/pricing/b.mp4'
                  width={128}
                  height={128}
                  muted
                  autoPlay
                  loop
                />
                <h3 className='text-lg font-bold'>Crie e Personalize suas lojas</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Preencha com informações basicas e configure as suas lojas.
                </p>
                <svg
                  className='absolute -top-16 left-64 w-28'
                  viewBox='0 0 400 400'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>SVGRepo icon</title>
                  <g id='SVGRepo_bgCarrier' stroke-width='0' />
                  <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' />
                  <g id='SVGRepo_iconCarrier'>
                    <path
                      d='M35 262C160.529 140.938 328.006 207.285 361 215.518'
                      stroke='#ffffff'
                      stroke-opacity='0.9'
                      stroke-width='16'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M343.69 143C355.23 190.289 361 214.681 361 216.177C361 218.421 327.488 234.13 312 258'
                      stroke='#ffffff'
                      stroke-opacity='0.9'
                      stroke-width='16'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </g>
                </svg>
              </div>
              <div className='flex flex-col items-center justify-center gap-2'>
                <video
                  className='rounded-lg transition-all hover:scale-110'
                  src='/img/pricing/c.mp4'
                  width={128}
                  height={128}
                  muted
                  autoPlay
                  loop
                />
                <h3 className='text-lg font-bold'>Compartilhe</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Outros jogadores interessem em seus itens podem entrar em contato diretamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id='pricing' className='mb-40 w-full rounded-lg bg-primary/5 py-12 md:py-24 lg:py-32'>
          <div className='container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10'>
            <div className='space-y-3 text-center'>
              <h2 className=' text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Planos e Preços</h2>
              <p className=' mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Escolha o plano perfeito para sua loja online e comece a vender itens de jogos hoje mesmo!
              </p>
            </div>
            <div className=' grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              <Card className='bg-stone-800 drop-shadow-[0_7px_20px_rgba(175,144,144,0.4)] transition-all hover:border-2 hover:border-[#c2b9b6]'>
                <CardContent className='flex flex-col items-center justify-center gap-4 p-4'>
                  <img
                    src='https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715882864/kakele-wiki/background/fmjsfk5yb2ush4si68b6.jpg'
                    width='400'
                    height='300'
                    alt='Project 1'
                    className='rounded-lg object-cover'
                  />
                  <div className='flex flex-col items-center justify-center space-y-2 p-2'>
                    <h3 className='w-full text-start text-xl font-bold'>Plano Gratuito</h3>
                    <h4 className='w-full text-start text-3xl font-bold'>
                      <span className='text-xl'>R$</span> 0 <span className='text-sm'>/mês*</span>
                    </h4>
                    <p className='min-h-[5rem] text-[0.8rem] text-gray-500 dark:text-gray-400'>
                      Ideal para quem está começando. Basta fazer o login para ter acesso à loja de afiliados da
                      Coinshub. Você pode vender todos os produtos Coinshub e ganhar comissão por cada venda.
                    </p>
                    <Button variant='shine' className='w-full'>
                      Registrar
                    </Button>
                    <div className='flex w-full items-center justify-center py-6'>
                      <Divider className='w-full' />
                    </div>
                    <ul className='flex flex-col gap-2'>
                      <li className='flex items-center'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          Vender como afiliado <span className='font-bold text-orange-500'>CoinsHub</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card className='scale-105 bg-[#0f1414] drop-shadow-[0_7px_20px_rgba(28,104,113,0.4)] transition-all hover:border-2 hover:border-[#69a1f5]'>
                <CardContent className='flex flex-col items-center justify-center gap-4 p-4'>
                  <img
                    src='https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715882864/kakele-wiki/background/fmjsfk5yb2ush4si68b6.jpg'
                    width='400'
                    height='300'
                    alt='Project 1'
                    className='rounded-lg object-cover'
                  />
                  <div className='flex flex-col items-center justify-center space-y-2 p-2'>
                    <h3 className='w-full text-start text-xl font-bold'>Plano Premium</h3>
                    <h4 className='w-full text-start text-3xl font-bold'>
                      <span className='text-xl'>R$</span> 10 <span className='text-sm'>/mês*</span>
                    </h4>
                    <p className='min-h-[5rem] text-[0.8rem] text-gray-500 dark:text-gray-400'>
                      Além dos benefícios do Plano Grátis, você pode customizar sua página de vendas para torná-la mais
                      atraente e personalizada, aumentando suas chances de venda dos seus itens.
                    </p>
                    <Button variant='shine' className='w-full bg-blue-300'>
                      Assinar
                    </Button>
                    <div className='flex w-full items-center justify-center py-6'>
                      <Divider className='w-full' />
                    </div>
                    <ul className='flex flex-col gap-2'>
                      <li className='flex items-center'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          Vender como afiliado <span className='font-bold text-orange-500'>CoinsHub</span>
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          Criar <span className='font-bold text-emerald-500'>5</span> lojas personalizadas
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>Acesso ao criador de lojas</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card className='bg-[#0f140f] drop-shadow-[0_7px_20px_rgba(199,219,95,0.4)] transition-all hover:border-2 hover:border-[#fcc556]'>
                <CardContent className='flex flex-col items-center justify-center gap-4 p-4'>
                  <img
                    src='https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715882864/kakele-wiki/background/fmjsfk5yb2ush4si68b6.jpg'
                    width='400'
                    height='300'
                    alt='Project 1'
                    className='rounded-lg object-cover'
                  />
                  <div className='flex flex-col items-center justify-center space-y-2 p-2'>
                    <h3 className='w-full text-start text-xl font-bold'>Premium Gold</h3>
                    <h4 className='w-full text-start text-3xl font-bold'>
                      <span className='text-xl'>R$</span> 15 <span className='text-sm'>/mês*</span>
                    </h4>
                    <p className='min-h-[5rem] text-[0.8rem] text-gray-500 dark:text-gray-400'>
                      Inclui todos os benefícios do Plano Premium, além de oferecer maior destaque para sua loja de
                      itens, maximizando suas vendas.
                    </p>
                    <Button variant='shine' className='w-full bg-yellow-500'>
                      Assinar
                    </Button>
                    <div className='flex w-full items-center justify-center py-6'>
                      <Divider className='w-full' />
                    </div>
                    <ul className='flex flex-col gap-2'>
                      <li className='flex items-center'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          Vender como afiliado <span className='font-bold text-orange-500'>CoinsHub</span>
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                          Criar <span className='font-bold text-emerald-500'>10</span> lojas personalizadas
                        </span>
                      </li>
                      <li className='flex items-center'>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>Acesso ao criador de lojas</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
