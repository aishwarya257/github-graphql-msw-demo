import { useMutation, gql } from "@apollo/client";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

interface IStarVariables {
  input: {
    clientMutationId: string;
    starrableId: string;
  };
}

interface IStarOutput {
  starrable: {
    id: string;
    stargazerCount: number;
  };
}

interface IAddStarOutput {
  addStar: IStarOutput;
}

interface IRemoveStarOutput {
  removeStar: IStarOutput;
}

const ADD_STAR = gql`
  mutation AddStar($input: AddStarInput!) {
    addStar(input: $input) {
      starrable {
        id
        stargazerCount
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation RemoveStar($input: RemoveStarInput!) {
    removeStar(input: $input) {
      starrable {
        id
        stargazerCount
      }
    }
  }
`;

export const Repository: FC<{
  nameWithOwner: string;
  description: string;
  stargazerCount: number;
  id: string;
}> = ({ nameWithOwner, description, stargazerCount, id }) => {
  const [addStar] = useMutation<IAddStarOutput, IStarVariables>(ADD_STAR);
  const [removeStar] = useMutation<IRemoveStarOutput, IStarVariables>(
    REMOVE_STAR
  );
  const [starCount, setStarCount] = useState(stargazerCount);
  const [isStarred, toggleIsStarred] = useState(false);
  const mutationCalled = useRef(false);
  useEffect(() => {
    if (starCount !== stargazerCount && !mutationCalled.current) {
      setStarCount(stargazerCount);
    }

    mutationCalled.current = false;
  }, [stargazerCount, starCount]);
  const toggleOnClick = async () => {
    const prevStarred = isStarred;
    mutationCalled.current = true;

    const variables = {
      input: { starrableId: id, clientMutationId: "aishwarya257" },
    };

    if (!prevStarred) {
      const { data } = await addStar({
        variables,
      });

      if (data) {
        setStarCount(data.addStar.starrable.stargazerCount);
      }
    } else {
      const { data } = await removeStar({
        variables,
      });

      if (data) {
        setStarCount(data.removeStar.starrable.stargazerCount);
      }
    }

    toggleIsStarred((prevIsStarred) => !prevIsStarred);
  };
  return (
    <>
      <h2> Repository Information </h2>
      <div className={styles.repository}>
        <div className={styles.repositoryItem}>
          <span className={styles.label}> Name </span>
          <span className={styles.content}> {nameWithOwner} </span>
        </div>
        <div className={styles.repositoryItem}>
          <span className={styles.label}> Description </span>
          <span className={styles.content}> {description} </span>
        </div>
        <div className={styles.repositoryItem}>
          <span className={styles.label}> Stars </span>
          <span className={styles.content}> {starCount} </span>
        </div>

        {nameWithOwner !== "Not available" && (
          <button onClick={toggleOnClick}>
            {isStarred ? "Remove" : "Add"} Star
          </button>
        )}
      </div>
    </>
  );
};
