import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DetailsPage from "./DetailsPage";
import {
  Button,
  Container,
  Stack,
  Row,
  Col,
  Form,
  FormLabel,
  Card
} from "react-bootstrap";
import { BsPower } from "react-icons/bs";
import { BsFillBrightnessLowFill } from "react-icons/bs";
import { AiOutlineFork } from "react-icons/ai";
import { GoStar as StarIcon } from "react-icons/go";
import Callback from "./Callback";
const Home = ({isLoggedIn,setIsloggedIn}) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("weekly");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const isoDate = startDate.toISOString().split("T")[0];
    return isoDate;
  });
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("accessToken");
  console.log(isAuthenticated);


  useEffect(() => {
    setIsLoading(true);
    const fetchTrendingRepos = async () => {
      try {
        const url = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc`;
        const response = await axios.get(url);
        setTrendingRepos(response.data.items);
        setIsLoading(false);
        console.log(response.data.items);
      } catch (error) {
        console.error("Error fetching trending repos:", error);
      }
    };

    fetchTrendingRepos();
  }, [date]);

  const handleRepoClick = (repo) => {
    dispatch({ type: "repoDetail", payload: repo });
    // navigate("/details");
    setShowDetails(true);
  };

  const handleDateRangeChange = (e) => {
    const selectedRange = e.target.value;
    setDateRange(selectedRange);
    let isoDate;

    if (selectedRange === "daily") {
      const today = new Date();
      const startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
      isoDate = startDate.toISOString().split("T")[0];
    } else if (selectedRange === "weekly") {
      const today = new Date();
      const startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      );
      isoDate = startDate.toISOString().split("T")[0];
    } else if (selectedRange === "monthly") {
      const today = new Date();
      const startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
      );
      isoDate = startDate.toISOString().split("T")[0];
    }

    setDate(isoDate);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLogout = () => {
	  localStorage.removeItem("accessToken")
	  setIsloggedIn(false)
    navigate("/");
  };

  const filteredRepos = trendingRepos.filter((repo) => {
    if (language) {
      return repo.language?.toLowerCase() === language.toLowerCase();
    }
    return true;
  });

  return (
    <>
	{!isloggedIn && <Callback setIsloggedIn={setIsloggedIn} /> }
      <Stack gap={2} className="col-md-5 mx-auto" style={{ minWidth: "100%" }}>
        <Container>
          <Row className="mt-2">
            <Col className="d-flex  justify-content-end">
              <Button variant="danger" onClick={handleLogout}>
                <BsPower /> Logout
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <h2>Trending Repositories</h2>
            </Col>
          </Row>
        </Container>

        {showDetails ? (
          <DetailsPage setShowDetails={setShowDetails} />
        ) : !isLoading ? (
          <Container>
            <Row className="d-flex justify-content-end gap-2 my-1">
              <div className="filter-item">
                <FormLabel>Date Range:</FormLabel>
                <Form.Select
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  className="select-box"
                >
                  <option value="daily">Today</option>
                  <option value="weekly">This week</option>
                  <option value="monthly">This month</option>
                </Form.Select>
              </div>
              <div className="filter-item">
                <FormLabel>Language:</FormLabel>
                <Form.Select
                  value={language}
                  onChange={handleLanguageChange}
                  className="select-box"
                >
                  <option value="">All</option>
                  <option value="ASP.NET">ASP.NET</option>
                  <option value="Basic">Basic</option>
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                </Form.Select>
              </div>
            </Row>
            <Row
              className="justify-content-md-center repo repo-list"
              style={{ cursor: "pointer", color: "white" }}
            >
              {filteredRepos.map((repo) => (
                <Card
                  key={repo.id}
                  className=" card col-sm-12 mb-2 p-3"
                  onClick={() => handleRepoClick(repo)}
                >
                  <Card.Title
                    className="repohead title"
                    onClick={() => handleRepoClick(repo)}
                  >
                    {repo.full_name}
                  </Card.Title>
                  <Card.Text className="card-description">
                    {repo.description}
                  </Card.Text>
                  <Card.Text className="d-flex gap-3 align-items-center">
                    <div className="d-flex gap-1 align-items-center">
                      <StarIcon />
                      {repo.stargazers_count}
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <AiOutlineFork />
                      {repo.forks_count}
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <BsFillBrightnessLowFill />
                      {repo.language}
                    </div>
                  </Card.Text>
                </Card>
              ))}
            </Row>
          </Container>
        ) : (
          <Loader />
        )}
      </Stack>
    </>
  );
};

export default Home;