export default async function exit(_: any, res: { clearPreviewData: () => void; writeHead: (arg0: number, arg1: { Location: string }) => void; end: () => void }) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' })
  res.end()
}
