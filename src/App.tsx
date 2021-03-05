import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { Repository } from "./Repository";

interface IRepository {
  repository: {
    nameWithOwner: string;
    forkCount: number;
    description: string;
    stargazerCount: number;
    id: string;
  };
}

const GET_REPOSITORY_DETAILS = gql`
  query Repository($repository: String!, $owner: String!) {
    repository(name: $repository, owner: $owner) {
      nameWithOwner
      forkCount
      description
      stargazerCount
      id
    }
  }
`;

export default function App() {
  const [selectedRepository, setSelectedRepository] = useState<{
    repository: string | null;
    owner: string | null;
  }>({
    repository: "react",
    owner: "facebook"
  });

  const { data, loading } = useQuery<IRepository>(GET_REPOSITORY_DETAILS, {
    variables: {
      repository: selectedRepository.repository,
      owner: selectedRepository.owner
    },
    fetchPolicy: "network-only"
  });

  const onRepositoryChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (value === "react") {
      setSelectedRepository({
        repository: "react",
        owner: "facebook"
      });
    } else if (value === "msw") {
      setSelectedRepository({
        repository: "msw",
        owner: "mswjs"
      });
    } else {
      setSelectedRepository({
        repository: "buggy",
        owner: "buggy"
      });
    }
  };

  console.log(data, loading);
  return (
    <div className={styles.App}>
      <p> Choose a repository </p>
      <div className={styles.form}>
        <label>
          React
          <input
            type="radio"
            value="react"
            checked={selectedRepository.repository === "react"}
            name="repository"
            onChange={onRepositoryChange}
          />
        </label>
        <label>
          MSW
          <input
            type="radio"
            value="msw"
            checked={selectedRepository.repository === "msw"}
            name="repository"
            onChange={onRepositoryChange}
          />
        </label>
        <label>
          Buggy repo{" "}
          <input
            type="radio"
            value="buggy"
            name="repository"
            checked={selectedRepository.repository === "buggy"}
            onChange={onRepositoryChange}
          />
        </label>
      </div>
      {loading ? (
        <div> loading </div>
      ) : (
        data && <Repository {...data.repository} />
      )}
    </div>
  );
}
