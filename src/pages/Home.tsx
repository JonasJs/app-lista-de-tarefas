import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { ITask, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const task: ITask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldTasks => [ ...oldTasks, task ]);

  }

  function handleToggleTaskDone(id: number) {
    const taskAlreadyExists = tasks.find(item => item.id === id);
    
    if(taskAlreadyExists) {
      const updatedTasks = tasks.map(task => {
        if(task.id === taskAlreadyExists.id) {
          return {
            ...task,
            done: !task.done,
          }
        }

        return task;
      });
      
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(id: number) {
    const taksFiltered = tasks.filter(item => item.id !== id);

    setTasks(taksFiltered);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})