interface Props {
  message: string | null;
}

function Error({ message }: Props) {
  return <div>{message}</div>;
}

export default Error;
