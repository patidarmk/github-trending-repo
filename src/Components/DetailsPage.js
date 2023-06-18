import { useSelector } from "react-redux";
import { Button, Container, Card } from "react-bootstrap";
import crossIcon from "../assets/cross.svg";
import { useNavigate } from "react-router-dom";

import {
  GoStar as StarIcon,
  GoRepoForked as ForkIcon,
  GoEye as WatchIcon,
  GoGist as LanguageIcon,
  GoPerson as UserIcon,
  GoIssueOpened as IssuesIcon,
  GoWatch as UpdatedIcon,
  GoFile as LicenseIcon,
  GoLock as VisibilityIcon
} from "react-icons/go";
const DetailsPage = ({ setShowDetails }) => {
  const selectedRepo = useSelector((state) => state.repo);
  console.log(selectedRepo);
  const navigate = useNavigate();
  const {
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    watchers_count,
    open_issues_count,
    license,
    visibility,
    html_url
  } = selectedRepo;
  return (
    <Container className="details-page">
      <div className="shadow p-3 mb-5 rounded user-info">
        <img
          className="icon"
          src={crossIcon}
          onClick={() => {
            setShowDetails(false);
          }}
          alt=""
        />
        <ul className="d-flex flex-column gap-2">
          <li>
            Name :{" "}
            <strong>
              <a rel="noreferrer" target="_blank" href={html_url}>
                {name}
              </a>
            </strong>
          </li>
          <li>About : {description}</li>
          <li>
            <LanguageIcon /> : {language}
          </li>
          <li>
            <StarIcon /> : {stargazers_count}
          </li>
          <li>
            <ForkIcon /> : {forks_count}
          </li>
          <li>
            <WatchIcon /> : {watchers_count}
          </li>
          <li>
            <IssuesIcon /> : {open_issues_count}
          </li>
          <li>
            <LicenseIcon /> : {license?.name}
          </li>
          <li>
            <VisibilityIcon /> : {visibility}
          </li>
        </ul>
      </div>
    </Container>
  );
};
export default DetailsPage;
