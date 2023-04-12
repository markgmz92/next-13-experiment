import Link from 'next/link';

async function fetchRepoContents(name) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    `https://api.github.com/repos/markgmz92/${name}/contents`
  );
  const contents = await response.json();
  console.log('This is contents', contents);
  return contents;
}

const RepoDirs = async ({ name }) => {
  const contents = await fetchRepoContents(name);

  console.log(typeof contents);
  const dirs = contents.filter((content) => content.type === 'dir');

  return (
    <>
      <h3>Directories</h3>
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link href={`/code/repos/${name}/${dir.path}`}>{dir.path}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default RepoDirs;
