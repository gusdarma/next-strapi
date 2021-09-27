import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'


export default function RichTextMd({ source } : any) {
  console.log(source, 'ini sourcenya');
  return (
    <div className="wrapper">
      {/* <MDXRemote {...source}/> */}
      <p className="">yuhu</p>
    </div>
  )
}

export async function getStaticPropsMdx() {
  // MDX text - can be from a local file, database, anywhere
  console.log("masuk static mdx");

  const source = 'Some **mdx** text, with a component <Heading />'
  const mdxSource = await serialize(source);

  console.log(mdxSource, 'ini hasil dibersihkan');
  return { props: { source: mdxSource } }
}
