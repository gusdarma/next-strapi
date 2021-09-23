import Markdown from "react-markdown";
// import rehypeSanitize from "rehype-sanitize";
// import rehypeRaw from 'rehype-sanitize';
import RichTextMd from '../../pages/components/richtext'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { redirect } from "next/dist/next-server/server/api-utils";
import ReactDOM from "react-dom";

interface typesRichText{
    data: {
        content: string;
    }
}

export const RichText: React.FC<typesRichText> = ({ data }) => {

    // const mdxSource = serialize(data.content);

    // console.log(mdxSource, 'ini mdxSource');

    // const asik = () => {
    //     render(){
    //         <Markdown transformImageUri={uri => uri.startsWith("http") ? uri : `${process.env.backend_url}${uri}`}>
    //             {data.content}
    //         </Markdown>
    //     }
    // }

    return (
        <div className="container py-12 prose prose-lg">
            {/* <RichTextMd /> */}
            <Markdown transformImageUri={uri => uri.startsWith("http") ? uri : `${process.env.backend_url}${uri}`}>
                {data.content}
            </Markdown>
            {/* <div className="" dangerouslySetInnerHTML={{__html: asik}}></div> */}
        </div>
    );
};

export default RichText;

// export async function getStaticProps() {
//     // MDX text - can be from a local file, database, anywhere
//     const source = 'Some **mdx** text, with a component <Heading />'
//     return { props: { source: mdxSource } }
// }
