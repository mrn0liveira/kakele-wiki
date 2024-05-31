'use client';

import { Card, CardContent } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Divider } from '@nextui-org/react';

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
                diretamente para outros jogadores. Ganhe dinheiro jogando e alcance o próximo nível de sucesso!
              </p>
            </div>
            <img
              src='https://res.cloudinary.com/dbkrvt2x0/image/upload/v1715882864/kakele-wiki/background/fmjsfk5yb2ush4si68b6.jpg'
              width='400'
              height='400'
              alt='Tamara Melnik'
              className='absolute opacity-60 md:opacity-100 top-0 mx-auto aspect-square overflow-hidden rounded-tr-[50%] rounded-bl-[50%] rounded-br-[20%] rounded-tl-[20%] object-cover object-center sm:w-full md:static'
            />
          </div>
        </section>
        <section id='skills' className='z-10 mt-40 w-full gap-8 pb-12 md:pb-24 lg:pb-32'>
          <div className='container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10'>
            <div className='space-y-3 z-50 text-center'>
              <h2 className='text-start text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-center'>
                O que oferecemos na My Store Games
              </h2>
              <p className='mx-auto max-w-[700px] text-start text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-center lg:text-base/relaxed xl:text-xl/relaxed'>
                Explore todas as funcionalidades e benefícios que nossa plataforma proporciona para tornar sua
                experiência de venda de itens de jogos online simples e eficiente.
              </p>
            </div>
            <div className='grid w-full grid-cols-2 items-start justify-center gap-12 mt-12 lg:grid-cols-4 lg:gap-12'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <LeafIcon className='h-12 w-12 text-gray-500 dark:text-gray-400' />
                <h3 className='text-lg font-bold'>Escolha seu jogo favorito</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>Tibia, Kakele Onlime, Rucoy, entre outros</p>
              </div>
              <div className='flex flex-col items-center justify-center gap-2'>
                <LeafIcon className='h-12 w-12 text-gray-500 dark:text-gray-400' />
                <h3 className='text-lg font-bold'>Participe de missões</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  errote mosntros e conquiste itens raros e valiosos.
                </p>
              </div>
              <div className='flex flex-col items-center justify-center gap-2'>
                <LeafIcon className='h-12 w-12 text-gray-500 dark:text-gray-400' />
                <h3 className='text-lg font-bold'>Crie e Personalize suas lojas</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Preencha com informações basicas e configure as suas lojas.
                </p>
              </div>
              <div className='flex flex-col items-center justify-center gap-2'>
                <LeafIcon className='h-12 w-12 text-gray-500 dark:text-gray-400' />
                <h3 className='text-lg font-bold'>Compartilhe</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Outros jogadores interessem em seus itens podem entrar em contato diretamente.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id='portfolio' className='mb-40 w-full bg-stone-900 py-12 md:py-24 lg:py-32'>
          <div className='container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10'>
            <div className='space-y-3 text-center'>
              <h2 className=' text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Planos e Preços</h2>
              <p className=' mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Escolha o plano perfeito para sua loja online e comece a vender itens de jogos hoje mesmo!
              </p>
            </div>
            <div className=' grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              <Card className='bg-stone-800 drop-shadow-[0_7px_20px_rgba(0,0,0,0.4)]'>
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
                      deal para quem está começando. Basta fazer o login para ter acesso à loja de afiliados da
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
              <Card className='scale-105 bg-[#0f1414] drop-shadow-[0_7px_20px_rgba(28,104,113,0.4)]'>
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
              <Card className='bg-[#0f140f] drop-shadow-[0_7px_20px_rgba(55,113,28,0.4)]'>
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
                    <Button variant='shine' className='w-full bg-lime-700'>
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

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='16 18 22 12 16 6' />
      <polyline points='8 6 2 12 8 18' />
    </svg>
  );
}

function DatabaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <ellipse cx='12' cy='5' rx='9' ry='3' />
      <path d='M3 5V19A9 3 0 0 0 21 19V5' />
      <path d='M3 12A9 3 0 0 0 21 12' />
    </svg>
  );
}

function FingerprintIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4' />
      <path d='M14 13.12c0 2.38 0 6.38-1 8.88' />
      <path d='M17.29 21.02c.12-.6.43-2.3.5-3.02' />
      <path d='M2 12a10 10 0 0 1 18-6' />
      <path d='M2 16h.01' />
      <path d='M21.8 16c.2-2 .131-5.354 0-6' />
      <path d='M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2' />
      <path d='M8.65 22c.21-.66.45-1.32.57-2' />
      <path d='M9 6.8a6 6 0 0 1 9 5.2v2' />
    </svg>
  );
}

function LeafIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z' />
      <path d='M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' />
    </svg>
  );
}

function RedoDotIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='17' r='1' />
      <path d='M21 7v6h-6' />
      <path d='M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7' />
    </svg>
  );
}
