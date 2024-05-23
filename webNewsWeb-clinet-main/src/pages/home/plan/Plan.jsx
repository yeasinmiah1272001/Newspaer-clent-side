import { PlanCard } from "../../../components/card/PlanCard";
import Container from "../../../components/container/Container";
import PageError from "../../../components/error/PageError";
import LoadingAnimation from "../../../components/loadingAnimation/LoadingAnimation";
import Title from "../../../components/title/Title";
import { usePlan } from "../../../hooks/api";

const Plan = () => {
  const { isLoading, error, plan } = usePlan();

  if (isLoading) return <LoadingAnimation />;
  if (error) return <PageError err={error} />;
  return (
    <section className="my-20">
      <Container>
        <Title>Plan</Title>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
          <PlanCard
            data={plan[0]}
            buttonText={"Try free for 1 month"}
            nameClass={"bg-white w-max text-text_primary"}
          ></PlanCard>
          <PlanCard
            data={plan[1]}
            buttonText={"Get Premium Duo"}
            nameClass={"bg-primary_color/80 w-max text-white"}
            className="border-4 border-primary_color/80"
          ></PlanCard>
          <PlanCard
            data={plan[2]}
            buttonText={"Get Premium Family"}
            nameClass={"bg-secondary_color w-max text-white"}
            className="border-4 border-secondary_color"
          ></PlanCard>
        </div>
      </Container>
    </section>
  );
};

export default Plan;
