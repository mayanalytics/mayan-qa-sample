import React, { useCallback, useEffect, useState } from 'react';
import { FieldErrors, Resolver, useFieldArray, useForm } from 'react-hook-form';
import './App.css';
import { SelectList, SelectListOptionType } from './components/SelectList';
import { getTasks } from './lib/data';

type FormValues = {
  summary: string;
  active_tasks: SelectListOptionType[];
  blocked_tasks: SelectListOptionType[];
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: FieldErrors<FormValues> = {};

  if (!values.summary) {
    errors.summary = {
      type: 'required',
      message: 'Summary is required',
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

const prepData = ({ summary, active_tasks, blocked_tasks }) => {
  return {
    summary,
    active: active_tasks.map(({ task_id }) => task_id),
    blocked: blocked_tasks.map(({ task_id }) => task_id),
  };
};

function App() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const activeTaskState = useFieldArray({
    control,
    name: 'active_tasks',
  });

  const blockedTaskState = useFieldArray({
    control,
    name: 'blocked_tasks',
  });

  const submitHandler = handleSubmit((data) => {
    alert(JSON.stringify(prepData(data), null, 2));
  });

  const [tasks, setTasks] = useState<Awaited<ReturnType<typeof getTasks>>>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  console.log(tasks);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcom User!</h1>
      </header>
      <main className="App-main">
        <div className="App-report">
          <h2>Daily Report</h2>
          <p>
            Wrap up your day by providing a summary of accomplishments. Make
            sure to provide as much detail as you can and document any issues or
            blockers you encountered today. Select the taskss worked on via the
            dopdown to update the progress of your projects.
          </p>
          <form onSubmit={submitHandler}>
            <fieldset>
              <label htmlFor="summary">Summary</label>
              <textarea
                id="summary"
                {...register('summary')}
                aria-invalid={!!errors.summary}
                aria-errormessage="summary_err"
              />
              <span id="summary_err" className="App-report--error_message">
                {errors.summary?.message}
              </span>
              <SelectList
                variant="green"
                label="Active Tasks"
                options={tasks}
                onChange={activeTaskState.replace}
              />
              <SelectList
                variant="red"
                label="Blocked Tasks"
                options={tasks}
                onChange={blockedTaskState.replace}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
