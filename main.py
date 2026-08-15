from graph import create_graph
from state import initial_state



def main():
    graph = create_graph()

    print(graph.get_graph().draw_mermaid())
    final_state=graph.invoke(initial_state)
    print(final_state)


if __name__ == "__main__":
    main()