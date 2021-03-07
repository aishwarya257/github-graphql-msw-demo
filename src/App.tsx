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

enum CACHE_POLICY {
  CACHE_FIRST = "cache-first",
  NETWORK_ONLY = "network-only",
}

export default function App() {
  const [selectedRepository, setSelectedRepository] = useState<{
    repository: string | null;
    owner: string | null;
  }>({
    repository: "react",
    owner: "facebook",
  });

  const queryProps = {
    variables: {
      repository: selectedRepository.repository,
      owner: selectedRepository.owner,
    },
    /** Sets cache policy to "network-only" for the test environment, if not apply the default cache policy which is "cache-first" */
    fetchPolicy:
      process.env.NODE_ENV === "test"
        ? CACHE_POLICY.NETWORK_ONLY
        : CACHE_POLICY.CACHE_FIRST,
  };

  const { data, loading } = useQuery<IRepository>(
    GET_REPOSITORY_DETAILS,
    queryProps
  );

  const onRepositoryChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    if (value === "react") {
      setSelectedRepository({
        repository: "react",
        owner: "facebook",
      });
    } else if (value === "msw") {
      setSelectedRepository({
        repository: "msw",
        owner: "mswjs",
      });
    } else {
      setSelectedRepository({
        repository: "buggy",
        owner: "buggy",
      });
    }
  };

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
