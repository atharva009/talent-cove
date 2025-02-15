interface CertificationsCardProps {
  issuer: string;
  title: string;
  issueDate: string;
  credentialID: string;
}

const CertificationsCard = (props: CertificationsCardProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-200 rounded-md">
          <img className="h-7" src={`/Icons/${props.issuer}.png`} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">{props.title}</div>
          <div className="text-sm text-mine-shaft-300">{props.issuer}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm text-mine-shaft-300">{props.issueDate}</div>
        <div className="text-sm text-mine-shaft-300">ID: {props.credentialID}</div>
      </div>
    </div>
  );
};

export default CertificationsCard;
